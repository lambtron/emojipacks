#!/bin/bash

subdomain=''
email=''
password=''

if [[ $1 -eq 0 ]] ; then
  path='./packs'
else
  path="$1"
fi

for f in "$path"/*.yaml
do
  echo $f
  emojipacks -s $subdomain -e $email -p $password -y $f;
done
