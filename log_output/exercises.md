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
