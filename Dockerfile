FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
COPY public ./public
COPY src ./src

ENV REACT_APP_API_URL=http://car-config-backend.eu-central-1.elasticbeanstalk.com

RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]


# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# # to make react-router work with nginx
# COPY nginx/nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD  ["nginx", "-g", "daemon off;"]