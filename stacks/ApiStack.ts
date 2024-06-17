import { Api, Config, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
    const { table } = use(StorageStack);
    const STRIPE_SECRET_KEY = new Config.Secret(stack, "STRIPE_SECRET_KEY");
    const api = new Api(stack, "Api", {
        customDomain: app.stage === "prod" ? "<api.yourdomainhere.com>" : undefined,
        defaults: {
            authorizer: "iam",
            function: {
                bind: [table, STRIPE_SECRET_KEY],
            },
        },
        routes: {
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes": "packages/functions/src/list.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main",
            "POST /billing": "packages/functions/src/billing.main",
        },
    });

    stack.addOutputs({
        ApiEndpoint: api.customDomainUrl || api.url,
    });

    return {
        api,
    }
}