# Exercise 3.09

New resource limits are cpu 150m and memory 100Mi 

# Exercise 3.02

```bash

tuomas@zoe:~/kurssit/kube$ kubectl get ing
NAME                CLASS    HOSTS   ADDRESS       PORTS   AGE
logoutput-ingress   <none>   *       34.8.167.43   80      25m
tuomas@zoe:~/kurssit/kube$ curl http://34.8.167.43/
file content: This text is from a file

MESSAGE: hello world
2024-11-11T16:45:16.609Z: e4812d9b-de75-43f5-96dd-b64dfcba5cef.

Ping / Pongs: 63tuomas@zoe:~/kurssit/kube$ v .
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
logoutput-dep-649bdb8869-rhv6l   2/2     Running   0          116s
pingpong-dep-7698b469db-6b99v    1/1     Running   0          53m
postgres-set-0                   1/1     Running   0          65m
```

# Exercise 2.06
```bash
tuomas@zoe:~/kurssit/kube$ kubectl apply -f log_output/manifests/
configmap/logoutput-configmap unchanged
deployment.apps/logoutput-dep unchanged
ingress.networking.k8s.io/logoutput-ingress unchanged
persistentvolumeclaim/image-claim unchanged
service/logoutput-svc unchanged
tuomas@zoe:~/kurssit/kube$ kubens
kube-system
kube-public
kube-node-lease
default
exercises
project
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                            READY   STATUS    RESTARTS      AGE
pingpong-dep-7746596496-5vwjc   1/1     Running   0             16m
logoutput-dep-5d96fb7cc-b277j   2/2     Running   1 (15s ago)   2m54s
tuomas@zoe:~/kurssit/kube$ curl localhost:8081
file content: This text is from a file

MESSAGE: hello world
2024-10-06T17:38:39.434Z: ea0de556-ee3c-4ac8-9a64-0bbb9d863004.

Ping / Pongs: 8
```

# Exercise 2.03
```bash
tuomas@zoe:~/kurssit/kube$ kubens
kube-system
kube-public
kube-node-lease
default
exercises
tuomas@zoe:~/kurssit/kube$ kubectl get pods --namespace=exercises
NAME                             READY   STATUS    RESTARTS   AGE
pingpong-dep-7746596496-qplsx    1/1     Running   0          7m26s
logoutput-dep-7f9c86dd78-f9dfs   2/2     Running   0          7m8s
tuomas@zoe:~/kurssit/kube$
```

# Exercise 2.01
```bash
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
logoutput-dep-7f9c86dd78-rjdj6   2/2     Running   0          5m36s
pingpong-dep-7746596496-6vxqb    1/1     Running   0          58s
tuomas@zoe:~/kurssit/kube$ kubectl get ing,svc
NAME                                          CLASS     HOSTS   ADDRESS                            PORTS   AGE
ingress.networking.k8s.io/logoutput-ingress   traefik   *       172.19.0.2,172.19.0.3,172.19.0.4   80      99m

NAME                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/kubernetes      ClusterIP   10.43.0.1       <none>        443/TCP    31d
service/logoutput-svc   ClusterIP   10.43.1.23      <none>        2345/TCP   99m
service/pingpong-svc    ClusterIP   10.43.222.251   <none>        2345/TCP   86m
tuomas@zoe:~/kurssit/kube$ curl localhost:8081
2024-10-04T10:38:40.080Z: f358e695-7115-4e43-b626-db535275f98c.
Ping / Pongs: 5tuomas@zoe:~/kurssit/kube$ curl localhost:8081
2024-10-04T10:38:40.080Z: f358e695-7115-4e43-b626-db535275f98c.
Ping / Pongs: 6tuomas@zoe:~/kurssit/kube$ curl localhost:8081
2024-10-04T10:38:45.084Z: 15e5acec-8075-495f-8c9e-c889a4af092e.
Ping / Pongs: 7
```

# Exercise 1.11

```bash

tuomas@zoe:~/kurssit/kube$ kubectl apply -f manifests/
persistentvolume/example-pv created
tuomas@zoe:~/kurssit/kube$ kubectl apply -f log_output/manifests/
deployment.apps/logoutput-dep created
ingress.networking.k8s.io/logoutput-ingress created
persistentvolumeclaim/image-claim created
service/logoutput-svc created
tuomas@zoe:~/kurssit/kube$ kubectl apply -f pingpong/manifests/
deployment.apps/pingpong-dep created
service/pingpong-svc created
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
logoutput-dep-59cc8d9c56-p6drs   2/2     Running   0          18s
pingpong-dep-865f998884-6q6s9    1/1     Running   0          9s
tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081
ENOENT: no such file or directory, open 'files/pong.txt'
tuomas@zoe:~/kurssit/kube$ v .
tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081/pingpong
pong 1
tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081/pingpong
pong 2
tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081/
2024-09-20T12:55:55.613Z: 307c9f51-c780-43c3-9644-9ed0b00a590f. Ping / Pongs: 2
```

# Exercise 1.10

```bash
tuomas@zoe:~/kurssit/kube/log_output$ docker build -t tfhuhtal/logoutput-hasher:1.101 --no-cache ./src/hasher/
[+] Building 2.2s (11/11) FINISHED                                                                                                                                                                  docker:default
 => [internal] load build definition from Dockerfile                                                                                                                                                          0.0s
 => => transferring dockerfile: 139B                                                                                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/node:alpine                                                                                                                                                1.5s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                                                                   0.0s
 => [internal] load .dockerignore                                                                                                                                                                             0.0s
 => => transferring context: 2B                                                                                                                                                                               0.0s
 => [1/5] FROM docker.io/library/node:alpine@sha256:c9bb43423a6229aeddf3d16ae6aaa0ff71a0b2951ce18ec8fedb6f5d766cf286                                                                                          0.0s
 => [internal] load build context                                                                                                                                                                             0.0s
 => => transferring context: 129B                                                                                                                                                                             0.0s
 => CACHED [2/5] WORKDIR /usr/src/app                                                                                                                                                                         0.0s
 => [3/5] COPY package* ./                                                                                                                                                                                    0.0s
 => [4/5] RUN npm ci                                                                                                                                                                                          0.5s
 => [5/5] COPY . .                                                                                                                                                                                            0.0s
 => exporting to image                                                                                                                                                                                        0.0s
 => => exporting layers                                                                                                                                                                                       0.0s
 => => writing image sha256:439781f0a7add307bdc2f07701a018e2cd5abe56ff2f6c850134c0025260c980                                                                                                                  0.0s
 => => naming to docker.io/tfhuhtal/logoutput-hasher:1.101                                                                                                                                                    0.0s
tuomas@zoe:~/kurssit/kube/log_output$ kubectl delete -f manifests/
deployment.apps "logoutput-dep" deleted
ingress.networking.k8s.io "logoutput-ingress" deleted
service "logoutput-svc" deleted
tuomas@zoe:~/kurssit/kube/log_output$ v .
tuomas@zoe:~/kurssit/kube/log_output$ docker push tfhuhtal/logoutput-hasher:1.101
The push refers to repository [docker.io/tfhuhtal/logoutput-hasher]
a10dfc88aa2c: Layer already exists
496938e1a44e: Pushed
2d73e6b96aa3: Pushed
1052b457b067: Layer already exists
6a8f65b6edec: Layer already exists
b298ceddbfb8: Layer already exists
44b1b6f4e77e: Layer already exists
63ca1fbb43ae: Layer already exists
1.101: digest: sha256:2b08c51995c0754fe8851853bbff9729d7ef0ff6377fc4f78a2598a0cb9d1b2b size: 1988
tuomas@zoe:~/kurssit/kube/log_output$ kubectl apply -f manifests/
deployment.apps/logoutput-dep created
ingress.networking.k8s.io/logoutput-ingress created
service/logoutput-svc created
tuomas@zoe:~/kurssit/kube/log_output$ kubectl get pods
pods                 pods.metrics.k8s.io
tuomas@zoe:~/kurssit/kube/log_output$ kubectl get pods
NAME                             READY   STATUS    RESTARTS      AGE
pingpong-dep-8579d744d4-8df5d    1/1     Running   6 (76m ago)   17d
logoutput-dep-7bcbdc7658-kdc9k   2/2     Running   0             18s
tuomas@zoe:~/kurssit/kube/log_output$ curl -L localhost:8081
2024-09-20T11:11:44.142Z: d54e14b9-48a8-487b-b90a-10a1a516bbe1
```

# Exercise 1.07 

```bash
tuomas@zoe:~/kurssit/kube/log_output$ docker build -t tfhuhtal/logoutput:1.077 --no-cache .
[+] Building 6.2s (11/11) FINISHED                                                                                           docker:default
 => [internal] load build definition from Dockerfile                                                                                   0.0s
 => => transferring dockerfile: 139B                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/node:alpine                                                                         1.1s
 => [auth] library/node:pull token for registry-1.docker.io                                                                            0.0s
 => [internal] load .dockerignore                                                                                                      0.0s
 => => transferring context: 2B                                                                                                        0.0s
 => [1/5] FROM docker.io/library/node:alpine@sha256:ed9736a13b88ba55cbc08c75c9edac8ae7f72840482e40324670b299336680c1                   0.0s
 => [internal] load build context                                                                                                      0.0s
 => => transferring context: 34.79kB                                                                                                   0.0s
 => CACHED [2/5] WORKDIR /usr/src/app                                                                                                  0.0s
 => [3/5] COPY package* ./                                                                                                             0.0s
 => [4/5] RUN npm ci                                                                                                                   4.9s
 => [5/5] COPY . .                                                                                                                     0.1s
 => exporting to image                                                                                                                 0.1s
 => => exporting layers                                                                                                                0.1s
 => => writing image sha256:b80a79bc5defa87fa882f8ffd7cec0d1e96af06f902fc84d41522731df73ecf5                                           0.0s
 => => naming to docker.io/tfhuhtal/logoutput:1.077                                                                                    0.0s
tuomas@zoe:~/kurssit/kube/log_output$ docker push tfhuhtal/logoutput:1.077
The push refers to repository [docker.io/tfhuhtal/logoutput]
8723cf39443c: Layer already exists
67991c1d5d53: Pushed
1837507c3a75: Pushed
cbac0077bdea: Layer already exists
31e94c6eb7ae: Layer already exists
966924c38592: Layer already exists
c727fbeac135: Layer already exists
78561cef0761: Layer already exists
1.077: digest: sha256:99159d1a5a9f5a4e0c3c0ac5c1fc84eb7a79815e91a909dd320b55f6939f2629 size: 1994
tuomas@zoe:~/kurssit/kube/log_output$ v .
tuomas@zoe:~/kurssit/kube/log_output$ kubectl apply -f manifests/
deployment.apps/logoutput-dep configured
ingress.networking.k8s.io/logoutput-ingress unchanged
service/logoutput-svc unchanged
tuomas@zoe:~/kurssit/kube/log_output$ curl -L localhost:8081
2024-09-02T16:06:08.114Z: b74d5645-ef0e-4cef-b40d-b4f382172293
```

# Exercise 1.03

```bash
kubectl apply -f manifests/deployment.yaml
deployment.apps/logoutput-dep created

kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
project-dep-7766bb4d47-x56m8     1/1     Running   0          12m
logoutput-dep-68d589988d-849vm   1/1     Running   0          10s

kubectl logs logoutput-dep-68d589988d-849vm

> log_output@1.0.0 start
> node index.js

2024-09-01T15:40:22.965Z: 0480970d-1af2-4dc9-9db5-6893fb735276
2024-09-01T15:40:27.974Z: 62782037-e328-4fb5-9ef2-f3a1122681cc
2024-09-01T15:40:32.979Z: 3fdcaa16-3632-4924-92d9-606b647f8e27
2024-09-01T15:40:37.981Z: e822fea9-582c-4b02-be5e-c4a7ec1f742e
2024-09-01T15:40:42.985Z: 0919a46d-e357-4123-a504-c2222c97b469
2024-09-01T15:40:47.989Z: a0884af5-bd25-4e71-ac44-fda1172333b3
```

# Exercise 1.01

Get pods command 

```bash 
kubectl get pods
NAME                            READY   STATUS    RESTARTS   AGE
logoutput-dep-57745f7fd-f24jg   1/1     Running   0          37m
```

Get logoutput-dep logs

```bash
kubectl logs logoutput-dep-57745f7fd-f24jg

> log_output@1.0.0 start
> node index.js

2024-09-01T14:37:21.746Z: 2a4bae5d-8138-423b-a4dd-b3f9e4071b2c
2024-09-01T14:37:26.754Z: 50ddf028-3753-473e-bdff-8201ae517f97
2024-09-01T14:37:31.758Z: 4636781a-9f40-4a5d-a2fa-8c170bb33fcb
2024-09-01T14:37:36.761Z: a42aa6c3-6068-4289-9b11-cf314384edd2
2024-09-01T14:37:41.766Z: ed8c7fa0-4df8-4cde-aa64-809a7c8f983d
2024-09-01T14:37:46.769Z: c924d1a8-e666-4f5b-8e13-433ae751ae11
2024-09-01T14:37:51.771Z: 95eacb8f-db3f-46d9-a236-522729d2f169
2024-09-01T14:37:56.777Z: 94dec4d1-d4dc-4fb3-a38e-1221a7911e6f
2024-09-01T14:38:01.781Z: 48eda24a-928b-4826-9755-903f01390664
2024-09-01T14:38:06.786Z: d1273fe7-dcd6-405f-bce2-d548a5c0bc23
2024-09-01T14:38:11.791Z: d3485034-08a9-49bc-9220-727508134496
2024-09-01T14:38:16.793Z: 45260aea-c252-4997-a144-c661ac4e4d25
2024-09-01T14:38:21.799Z: 3d15af02-a2ae-4ebf-b390-d446e7048a86
```
