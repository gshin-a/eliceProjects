FROM node:latest
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --force
COPY . .
EXPOSE 5001
COPY index.js /app/index.js
CMD ["npm", "start"]
