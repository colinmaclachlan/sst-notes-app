import { StackContext, StaticSite, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
    const { api } = use(ApiStack);
    const { auth } = use(AuthStack);
    const { bucket } = use(StorageStack);
    const site = new StaticSite(stack, "ReactSite", {
        customDomain:
            app.stage === "prod"
                ? {
                    domainName: "<YOUR DOMAIN>",
                    domainAlias: "www.<YOUR DOMAIN>",
                }
                : undefined,
        path: "packages/frontend",
        buildCommand: "pnpm run build",
        buildOutput: "dist",
        environment: {
            VITE_API_URL: api.customDomainUrl || api.url,
            VITE_REGION: app.region,
            VITE_BUCKET: bucket.bucketName,
            VITE_USER_POOL_ID: auth.userPoolId,
            VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
            VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
        }
    });
    stack.addOutputs({
        SiteUrl: site.customDomainUrl || site.url,
    });
}