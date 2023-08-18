import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Auth, Api, Web } from './construct';

export class GenerativeAiUseCasesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    process.env.overrideWarningsEnabled = 'false';

    const auth = new Auth(this, 'Auth');
    const api = new Api(this, 'API', {
      userPool: auth.userPool,
    });

    const web = new Web(this, 'Api', {
      apiEndpointUrl: api.api.url,
      userPoolId: auth.userPool.userPoolId,
      userPoolClientId: auth.client.userPoolClientId,
    });

    new CfnOutput(this, 'WebUrl', {
      value: `https://${web.distribution.domainName}`,
    });
  }
}