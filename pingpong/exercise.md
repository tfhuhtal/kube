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

# Exercise 1.09

```bash
tuomas@zoe:~/kurssit/kube$ kubectl apply -f log_output/manifests/
deployment.apps/logoutput-dep unchanged
ingress.networking.k8s.io/logoutput-ingress configured
service/logoutput-svc unchanged
tuomas@zoe:~/kurssit/kube$ kubectl apply -f log_output/manifests/
deployment.apps/logoutput-dep unchanged
ingress.networking.k8s.io/logoutput-ingress unchanged
service/logoutput-svc unchanged
tuomas@zoe:~/kurssit/kube$ kubectl apply -f pingpong/manifests/
deployment.apps/pingpong-dep created
service/pingpong-svc created
tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081/pingpong
pong 1tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081/pingpong
pong 2tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081/pingpong
pong 3tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081/pingpong
pong 4
```
