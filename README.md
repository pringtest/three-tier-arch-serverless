# THREE TIER ARCHITECTURE SERVERLESS

![alt text](./image/three-tier-arch-serverless.png)

1. This architecture consist of:
- AWS S3
- AWS API GATEWAY
- AWS LAMBDA
- AWS DYNAMODB

## Build and Deploy

1. First time deployment run this command
```bash
sam build && sam deploy --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --no-confirm-changeset
```

2. Second time deployment run this command
```bash
yarn deploy
```

## Static Website Hosting Setup

1. git clone the repo
```bash
git clone https://github.com/pringtest/demo_web_server.git
cd demo_web_server
```

2. Change `<BUCKET_HOSTING_NAME>` at `package.json`.

3. Copy next.config.example.js to next.config.js and fill all the environment variable
```bash
cp next.config.example.js next.config.js
vim next.config.js
```

4. Build and deploy `NEXTJs` to the S3 bucket hosting.
```bash
yarn build
yarn export
yarn webdeploy
```

## Cleanup

1. To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name sam-app
```