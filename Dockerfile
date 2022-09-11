# RUN
# docker build --tag my_node_js_rma:1 .

# Based on images node
FROM node:16

# init env
ENV NODE_ENV=production

# Workdir
WORKDIR /app

# Init Copy
COPY ["package.json", "package-lock.json*", "./"]

# Install run
RUN npm install --production

# Copy everithing in (current HOST directory) into (current CONTAINER directory)
COPY . .

# Expose 8000
EXPOSE 8000

#  Run
CMD [ "node", "index.js" ]