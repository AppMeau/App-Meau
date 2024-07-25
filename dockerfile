FROM ubuntu:24.10
# Install basic packages
RUN apt update && apt install -y gnupg wget ca-certificates unzip curl git openjdk-21-jdk android-sdk 
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN NODE_MAJOR=20 echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list


RUN apt update -y && apt install -y nodejs

# Download Android SDK and set PATH
RUN mkdir /android-sdk
RUN mkdir /android-sdk/cmdline-tools
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip && unzip *.zip -d /android-sdk/cmdline-tools && rm *.zip
RUN mv /android-sdk/cmdline-tools/cmdline-tools /android-sdk/cmdline-tools/tools
ENV ANDROID_HOME="/android-sdk"
ENV PATH="$PATH:$ANDROID_HOME/cmdline-tools/tools/bin"

RUN yes | sdkmanager --licenses
RUN sdkmanager --install 'ndk;23.1.7779620'

# Install platform-tools
#ENV PATH="$PATH:$ANDROID_HOME/platform-tools"

RUN git clone https://github.com/AppMeau/App-Meau.git

WORKDIR /App-Meau

RUN cd /App-Meau
RUN chmod +x ./build.sh

RUN mkdir build
# RUN update-alternatives --config java
RUN java -version

RUN npm install yarn -g
RUN npm install eas-cli expo -g

#RUN cd App-Meau && sh build.sh
#
CMD ["sh", "-c", "./build.sh"]
