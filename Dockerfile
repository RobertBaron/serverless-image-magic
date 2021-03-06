FROM lambci/lambda:build-nodejs12.x

RUN yum install -y libpng-devel libjpeg-devel libwebp-tools libglvnd-glx libXi

COPY package*.json ./
RUN npm install

COPY src src/
COPY serverless.yml serverless.yaml

CMD ./node_modules/.bin/serverless deploy --stage $STAGE