# Build stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16 AS build
ENV VITE_APP_BASE_URL=https://kffd21a2cda73a.user-app.krampoline.com
ENV VITE_REACT_APP_KAKAO_REST_API_KEY=e58bdec4ac3d35ddddcfcfdb3d44fdde
ENV VITE_REACT_APP_KAKAO_JAVASCRIPT_KEY=e833416820b3f82b62dba6f6c3de3bb8
ENV GENERATE_SOURCEMAP=false
WORKDIR /usr/src/app
COPY /package*.json ./
RUN npm i
COPY / ./
RUN npm run build

# Run stage

FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g serve
EXPOSE 3000



CMD ["serve", "-s", "dist"]
