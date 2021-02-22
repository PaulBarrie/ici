#!/bin/bash


username=${username:-root}
while [ $# -gt 0 ]; do

   if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare $param="$2"
        # echo $1 $2 // Optional to see the parameter:value result
   fi

  shift
done


sudo -u $username apt-get update
sudo -u $username apt-get install build-essential checkinstall zlib1g-dev -y