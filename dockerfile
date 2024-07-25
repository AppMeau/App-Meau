FROM alpine:3.20.2
RUN apk upgrade && apk add --no-cache unzip curl git openjdk21-jdk android-tools nodejs npm
RUN git clone https://github.com/AppMeau/App-Meau.git
WORKDIR /App-Meau
# RUN update-alternatives --config java
RUN java -version

RUN npm install yarn -g
RUN npm install eas-cli expo -g

#RUN cd App-Meau && sh build.sh
