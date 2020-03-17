# Generate RSA key
openssl genrsa -des3 -passout pass:123 -out ca.key 4096

# Create self signed certificate
openssl req -new -x509 -days 365 -key ca.key -out ca.crt -passin pass:123 -subj "/C=FR/ST=./L=./O=ACME Signing Authority Inc/CN=."

# Generate server key
openssl genrsa -out server/server.key 4096

# Generate server certificate request
openssl req -new -key server/server.key -out server/server.csr -passout pass:123 -subj "/C=FR/ST=./L=./O=ACME Signing Authority Inc/CN=localhost"

# Generate sign server cert with self-signed cert
openssl x509 -req -days 365 -passin pass:123 -in server/server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server/server.crt

# Generate client key
openssl genrsa -out client/client.key 4096

# Generate client certificate request
openssl req -new -key client/client.key -out client/client.csr -passout pass:123 -subj "/C=FR/ST=./L=./O=ACME Signing Authority Inc/CN=CLIENT"

# Generate sign client cert with self-signed cert
openssl x509 -req -days 365 -passin pass:123 -in client/client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client/client.crt
