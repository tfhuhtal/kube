# Exercise 5.04

```bash
tuomas@zoe:~/kurssit/kube$ kubectl apply -f wikipedia/manifests/deployment.yaml
deployment.apps/wikipedia-app created
service/wikipedia-app-service created
ingress.networking.k8s.io/wikipedia-app-ingress created
tuomas@zoe:~/kurssit/kube$ kubectl get ing
NAME                    CLASS     HOSTS   ADDRESS                            PORTS   AGE
wikipedia-app-ingress   traefik   *       172.20.0.2,172.20.0.3,172.20.0.4   80      16s
tuomas@zoe:~/kurssit/kube$ kubectl get po
NAME                             READY   STATUS    RESTARTS       AGE
postgres-set-0                   1/1     Running   2 (3h4m ago)   8d
pingpong-dep-dbbc88b48-sw5j6     1/1     Running   2 (3h4m ago)   8d
wikipedia-app-69bbbfd9cb-pcsjq   2/2     Running   0              63s
```

![](wiki.png)