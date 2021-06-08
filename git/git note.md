# git 常用命令
0.其他

1. 设置代理，取消代理`git config --global --unset https.proxy`

1.查看 

   1. `git log` 查看提交
   2. `git log --pretty=oneline` 改变查看格式
   3. `git reflog` 查看所有改动
   4. `git status` 查看当前版本状况  

2.创建版本库
   1. `git init` 初始化git仓库
   2. `git add <file>` 添加文件到暂存区（若已有，替换为修改过的）
   3. `git add .` 全部添加到暂存区(当git的文件夹有变更时，此命令可以记录所有变更)
   4. `git commit -m'message'` 提交到历史区

3.版本跳转
   1. `git log` 获取版本号
   2. `git reset --hard <commitId>` 跳转到对应版本

4.撤销修改
   1. `git checkout --<file>` 撤销工作区修改（用版本库替换工作区）
   2. 暂存区修改撤销需要版本回退

5.远程仓库
   1. `git remote add <origin> <http...>` 关联远程仓库
   2. `git push <origin> <master>` 推送到远程仓库（第一次加 -u）
   3. `git clone <http...>` 克隆仓库

6.分支管理  
   1. `git branch` 查看分支
   2. `git branch <dev>` 创建分支
   3. `git checkout <dev>` 移动到...分支
   4. `git checkout -b <dev>` 创建并移动到...分支
   5. `git merge <dev>` 将...分支合并到当前分支（通常加--no-ff）
   6. `git branch -d <dev>` 删除...分支  
   7. `git stash` 掩藏工作现场
   8. `git stash pop` 回到工作现场 
