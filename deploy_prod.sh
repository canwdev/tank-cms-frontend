read -p ">>> [部署]警告：确认发布，这将删除原有文件？请勿在开发环境执行！(y/n)" CONT
if [ "$CONT" = "n" ]; then
  echo ">>> 取消";
  exit
else
  echo ">>> YES"
fi

echo ">>> 删除上次发布的文件"
rm -rf .nuxt node_modules assets server deploy_bundle.sh ecosystem.config.js nuxt.config.js package.json yarn.lock

echo ">>> 解压中..."
tar xzf prod.tar.gz

pm2 restart ./ecosystem.config.js

echo ">>> [部署]执行结束！"
