# Exercise 1.02

```bash
k3d image import tuomas/project:1.02
INFO[0000] Importing image(s) into cluster 'k3s-default'
INFO[0000] Starting new tools node...
INFO[0000] Starting node 'k3d-k3s-default-tools'
INFO[0000] Saving 1 image(s) from runtime...
INFO[0001] Importing images into nodes...
INFO[0001] Importing images from tarball '/k3d/images/k3d-k3s-default-images-20240901182717.tar' into node 'k3d-k3s-default-server-0'...
INFO[0001] Importing images from tarball '/k3d/images/k3d-k3s-default-images-20240901182717.tar' into node 'k3d-k3s-default-agent-1'...
INFO[0001] Importing images from tarball '/k3d/images/k3d-k3s-default-images-20240901182717.tar' into node 'k3d-k3s-default-agent-0'...
INFO[0003] Removing the tarball(s) from image volume...
INFO[0004] Removing k3d-tools node...
INFO[0004] Successfully imported image(s)
INFO[0004] Successfully imported 1 image(s) into 1 cluster(s)

kubectl create deployment project-dep --image=tuomas/project:1.02
deployment.apps/project-dep created

kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
logoutput-dep-57745f7fd-f24jg   1/1     Running   0          51m
project-dep-7766bb4d47-x56m8    1/1     Running   0          8s
tuomas@zoe:~/kurssit/kube/project$ kubectl logs project-dep-7766bb4d47-x56m8

> project@1.0.0 start
> node index.js

Server started on port 3000
```
