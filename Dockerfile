FROM node:alpine
WORKDIR /
COPY . .
RUN npm install
RUN npm run build
EXPOSE 7878
CMD npm run start