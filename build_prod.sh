read -p ">>> [打包]提示：是否重新构建? (y/n)" CONT
if [ "$CONT" = "n" ]; then
  echo ">>> 跳过";
else
  echo ">>> 重新构建"
  rm -rf ./.nuxt
  npm install
  npm run build
fi

echo ">>> [打包]打包指定的文件..."
tar czf prod.tar.gz .nuxt node_modules assets server deploy_prod.sh ecosystem.config.js nuxt.config.js package.json package-lock.json
echo ">>> [打包]执行结束！"
