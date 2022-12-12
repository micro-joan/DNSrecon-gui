

#COLORES
green='\033[1;32m'
red='\e[;31m'
endcolor='\033[0m'
install_library='\033[1;31m'

#LIBRERIAS
php_installed=`which php`
dnsrecon_installed=`which php`

echo " "
echo "Checking necessary programs for DNSRECON-GUI"
echo "============================================"

sleep 0.5

#Check as ROOT
if ! [ $(id -u) = 0 ]; 
    then 
        echo ""
        echo " ${red} EXECUTE AS ROOT!! ${endcolor}" 
        exit  
fi

#Check PHP
if [ -z $php_installed ] #si php_installed es vacío..
    then
        echo "PHP ${red} KO ${endcolor}"
        echo ""
        echo "${install_library} Put 'apt install php' on terminal ${endcolor}"
        exit
    else
        echo "PHP ${green} OK ${endcolor}"
fi

sleep 0.5

#Check dnsrecon
if [ -z $dnsrecon_installed ]
    then
        echo "DNSRECON ${red} KO ${endcolor}"
        echo ""
        echo "${install_library} Put 'apt-get install dnsrecon' ${endcolor}"
        exit
    else
        echo "DNSRECON ${green} OK ${endcolor}"
fi

sleep 0.5

echo ""

#LAUNCH APACHE
/etc/init.d/apache2 restart

systemctl start apache2

sleep 1

  rm -r /var/www/html/dnsrecon-gui/ #borramos el directorio y su contenido
  mkdir /var/www/html/dnsrecon-gui #volvemos a crear el directorio
  mkdir /var/www/html/dnsrecon-gui/dnsrecon_results/
  cp -r * /var/www/html/dnsrecon-gui/ #copiamos todos los archivos al nuevo directorio
  chmod -R 777 /var/www/html/dnsrecon-gui/
  
sleep 1


echo ""
echo "${red}OPEN THIS URL ON A PRIVATE WINDOW:${endcolor}"
echo ""
echo "========================================="
echo "http://localhost/dnsrecon-gui/index.php"
echo "========================================="
exit
