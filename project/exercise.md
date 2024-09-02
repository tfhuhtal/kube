# Exercise 1.08

```bash
tuomas@zoe:~/kurssit/kube/project$ kubectl apply -f manifests/
deployment.apps/project-dep created
ingress.networking.k8s.io/project-ingress created
service/project-svc created
tuomas@zoe:~/kurssit/kube/project$ curl -L localhost:8081
Hellot
```

# Exercise 1.06

```bash
kubectl apply -f manifests/deployment.yaml
deployment.apps/project-dep created

kubectl apply -f manifests/service.yaml
service/project-svc unchanged

kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
logoutput-dep-68d589988d-pwv7v   1/1     Running   0          9m46s
project-dep-6f95f8779d-lmlfb     1/1     Running   0          11s

curl localhost:8082
Hello
```

# Exercise 1.05

```bash
kubectl get pods
NAME                             READY   STATUS    RESTARTS      AGE
logoutput-dep-68d589988d-849vm   1/1     Running   1 (24m ago)   23h
project-dep-866679699f-brcvx     1/1     Running   1 (24m ago)   23h
tuomas@zoe:~/kurssit/kube/project$ kubectl port-forward project-dep-866679699f-brcvx 3003:3000
Forwarding from 127.0.0.1:3003 -> 3000
Forwarding from [::1]:3003 -> 3000
Handling connection for 3003
```

And I fetched the html response from localhost:3003 

```bash
curl -L localhost:3003
Hello
```
```

# Exercise 1.04

```bash
kubectl delete deployment project-dep
deployment.apps "project-dep" deleted

kubectl apply -f manifests/deployment.yaml
deployment.apps/project-dep created

kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
logoutput-dep-68d589988d-849vm   1/1     Running   0          6m3s
project-dep-866679699f-brcvx     1/1     Running   0          13s

kubectl logs project-dep-866679699f-brcvx

> project@1.0.0 start
> node index.js
```

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

kubectl logs project-dep-7766bb4d47-x56m8

> project@1.0.0 start
> node index.js

Server started on port 3000
```
