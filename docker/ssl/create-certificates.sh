#!/bin/bash

if ! command -v openssl &> /dev/null
then
    echo "INSTALL PREREQUESITES..."
    sh install-prerequisites.sh
    exit
fi

rm -rf certs

username=${username:-root}
while [ $# -gt 0 ]; do

   if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare $param="$2"
        # echo $1 $2 // Optional to see the parameter:value result
   fi

  shift
done

mkdir certs
openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -config server.cnf\
            -out certs/ici-certificate.crt \
            -keyout certs/ici-key.key


# REMOVE OLDS CERTIFICATES
sudo -u $username rm -rf /usr/local/share/ca-certificates/ici-certificate.crt
rm -rf ~/.mozilla/certificates/
cp -r certs  ~/.mozilla/certificates/ 
# ADD CERTIFICATES
sudo -u $username cp certs/ici-certificate.crt  /usr/local/share/ca-certificates/ 
sudo update-ca-certificates