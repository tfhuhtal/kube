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
