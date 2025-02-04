# Exercise 5.03

![script](./assets/5_3.png)

# Exercise 5.02

Modified the svc to ClusterIP and removed nginx ingress

then installed linkerd and run these commands

```bash
tuomas@zoe:~/kurssit/kube$ kubectl get -n prod deploy -o yaml | linkerd inject - | kubectl apply -f -

deployment "nats" injected
deployment "publisher" injected
deployment "project" injected

deployment.apps/nats configured
deployment.apps/publisher configured
deployment.apps/project configured
tuomas@zoe:~/kurssit/kube$ linkerd viz dashboard
Linkerd dashboard available at:
http://localhost:50750
Grafana dashboard available at:
http://localhost:50750/grafana
Opening Linkerd dashboard in the default browser
```
![img](./assets/svcmesh.png)


# Exercise 4.08

Rearranged manifests to new structure following the principles that was shown in the course material.

Then changed secrets to sealed secrets and installed the sealed secret operator to my cluster

Then created github workflows to handle pushes and new tag creation.

Here is images that publisher pushes image to telegram only when in prod

![image1231](./assets/argoprod.png)
![imafe21311](./assets/argostaging.png)
![](./assets/argocd1.png)
![](./assets/argocd2.png)

The staging throws error cuz, I provided falsy url so the publishing fails.

# Exercise 4.06

Installed nats and set it up using instructions.

Then I created the todo-publisher.

Also I modified the project backend to connect to the nats when creating new todo or updating todos

Then I created telegram bot and connected it to the publisher

![picture_nats](./assets/nats.png)

# Exercise 4.05 

```bash
tuomas@zoe:~/kurssit/kube$ kubectl apply -k project/
secret/postgres-secret created
service/backend-svc created
service/postgres-db-svc created
service/project-svc created
persistentvolumeclaim/project-claim created
deployment.apps/backend-dep created
deployment.apps/project-dep created
statefulset.apps/postgres-set created
cronjob.batch/pg-backup created
cronjob.batch/todo-cron created
analysistemplate.argoproj.io/cpu-usage created
rollout.argoproj.io/backend-dep created
ingress.networking.k8s.io/project-ingress created
tuomas@zoe:~/kurssit/kube$ kubectl port-forward project-dep-cbc5f476b-ptbps 8080:8080
Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
Handling connection for 8080
^Ctuomas@zoe:~/kurssit/kube$ kubectl port-forward project-dep-cbc5f476b-ptbps 8080:8080
Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
Handling connection for 8080
^Ctuomas@zoe:~/kurssit/kube$ kubectl get po
NAME                           READY   STATUS    RESTARTS         AGE
postgres-set-0                 1/1     Running   0                5m40s
project-dep-cbc5f476b-ptbps    1/1     Running   0                5m40s
backend-dep-759b5b89f-tg526    1/1     Running   0                5m41s
backend-dep-865f7ccdbc-pqftf   1/1     Running   0                5m40s
my-busybox                     1/1     Running   94 (3m53s ago)   62d
```

![done](./assets/v1_9.png)

```bash
> project@1.0.0 start
> node index.js

Server started on port 8080
Cached image not found or expired. Fetching new image...
Image fetched and saved to /usr/src/app/files/cached-image.jpg
Cached image found.
{
  id: 5,
  title: 'Read https://en.wikipedia.org/wiki/List_of_Royal_Flying_Corps_generals',
  done: true
}
Cached image found.
```

# Exercise 4.04

```bash
tuomas@zoe:~/kurssit/kube$ kubectl create namespace argo-rollouts
namespace/argo-rollouts created
tuomas@zoe:~/kurssit/kube$ kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
customresourcedefinition.apiextensions.k8s.io/analysisruns.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/analysistemplates.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/clusteranalysistemplates.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/experiments.argoproj.io created
customresourcedefinition.apiextensions.k8s.io/rollouts.argoproj.io created
serviceaccount/argo-rollouts created
clusterrole.rbac.authorization.k8s.io/argo-rollouts created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-admin created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-edit created
clusterrole.rbac.authorization.k8s.io/argo-rollouts-aggregate-to-view created
clusterrolebinding.rbac.authorization.k8s.io/argo-rollouts created
configmap/argo-rollouts-config created
secret/argo-rollouts-notification-secret created
service/argo-rollouts-metrics created
deployment.apps/argo-rollouts created

tuomas@zoe:~/kurssit/kube$ kubectl delete -k project/
secret "postgres-secret" deleted
service "backend-svc" deleted
service "postgres-db-svc" deleted
service "project-svc" deleted
persistentvolumeclaim "project-claim" deleted
deployment.apps "backend-dep" deleted
deployment.apps "project-dep" deleted
statefulset.apps "postgres-set" deleted
cronjob.batch "pg-backup" deleted
cronjob.batch "todo-cron" deleted
ingress.networking.k8s.io "project-ingress" deleted

tuomas@zoe:~/kurssit/kube$ kubectl apply -k project/
secret/postgres-secret created
service/backend-svc created
service/postgres-db-svc created
service/project-svc created
persistentvolumeclaim/project-claim created
deployment.apps/backend-dep created
deployment.apps/project-dep created
statefulset.apps/postgres-set created
cronjob.batch/pg-backup created
cronjob.batch/todo-cron created
analysistemplate.argoproj.io/cpu-usage created
rollout.argoproj.io/backend-dep created
ingress.networking.k8s.io/project-ingress created

tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                           READY   STATUS    RESTARTS       AGE
my-busybox                     1/1     Running   93 (31m ago)   62d
postgres-set-0                 1/1     Running   0              104s
project-dep-765bb84fc5-zntb4   1/1     Running   0              104s
backend-dep-84fc7bf665-jhzl9   1/1     Running   0              104s
backend-dep-8656487dd5-xnfkt   1/1     Running   0              103s
```

# Exercise 4.03
Installed the prometheus like instructed
```bash
tuomas@zoe:~/kurssit/kube/project$ kubectl -n prometheus port-forward prometheus-kube-prometheus-stack-1729-prometheus-0 9090:9090
Forwarding from 127.0.0.1:9090 -> 9090
Forwarding from [::1]:9090 -> 9090
Handling connection for 9090
Handling connection for 9090
Handling connection for 9090

```

![query](./assets/query.png)

# Exercise 4.02

```bash
tuomas@zoe:~/kurssit/kube/project$ kubectl apply -k .
secret/postgres-secret unchanged
service/backend-svc configured
service/postgres-db-svc unchanged
service/project-svc configured
deployment.apps/backend-dep created
deployment.apps/project-dep created
cronjob.batch/pg-backup created
cronjob.batch/todo-cron configured
ingress.networking.k8s.io/project-ingress configured

tuomas@zoe:~/kurssit/kube/project$ kubectl get ing
NAME              CLASS   HOSTS   ADDRESS                            PORTS   AGE
project-ingress   nginx   *       172.19.0.2,172.19.0.3,172.19.0.4   80      76d

tuomas@zoe:~/kurssit/kube/project$ kubectl get po
NAME                           READY   STATUS      RESTARTS       AGE
my-busybox                     1/1     Running     91 (36m ago)   61d
postgres-set-0                 1/1     Running     25 (35m ago)   70d
todo-cron-28912020-8bzl4       0/1     Completed   0              84m
todo-cron-28904340-x2jjn       0/1     Completed   0              5d9h
todo-cron-28912080-cm87r       0/1     Completed   0              27m
project-dep-765bb84fc5-x2k2w   1/1     Running     0              45s
backend-dep-6b76c6bfdf-z5lj2   1/1     Running     0              45s
```

# Exercise 3.10

![Logs](./assets/GKE_LOGS.png)

# Exercise 3.08

Set the limits to 150m cpu and 100Mi memory

# Exercise 3.07

made cronjob script and yaml files for backup cronjob also I added serviceAccountName to backupcronjob.yaml file

and then ran these commands

```bash

tuomas@zoe:~/kurssit/kube$ kubectl create serviceaccount github-actions --namespace default
serviceaccount/github-actions created

tuomas@zoe:~/kurssit/kube$ kubectl get serviceaccounts
NAME             SECRETS   AGE
default          0         22m
github-actions   0         16m

tuomas@zoe:~/kurssit/kube$ gcloud iam service-accounts add-iam-policy-binding \
  github-actions@PROJECT_ID.iam.gserviceaccount.com \
  --member="serviceAccount:PROJECT_ID.svc.id.goog[default/github-actions]" \
  --role="roles/iam.workloadIdentityUser"
Updated IAM policy for serviceAccount [github-actions@PROJECT_ID.iam.gserviceaccount.com].
bindings:
- members:
  - serviceAccount:PROJECT_ID.svc.id.goog[default/github-actions]
  role: roles/iam.workloadIdentityUser
etag: BwYnQAWzYuI=
version: 1
tuomas@zoe:~/kurssit/kube$ kubectl annotate serviceaccount github-actions --namespace default iam.gke.io/gcp-service-account=github-actions@PROJECT_ID.iam.gserviceaccount.com
serviceaccount/github-actions annotated

tuomas@zoe:~/kurssit/kube$ gcloud container node-pools list --cluster=dwk-cluster --zone=europe-north1-b
NAME          MACHINE_TYPE  DISK_SIZE_GB  NODE_VERSION
default-pool  e2-medium     100           1.29.9-gke.1496000

tuomas@zoe:~/kurssit/kube$ gcloud container node-pools update default-pool --cluster=dwk-cluster --zone=europe-north1-b --workload-metadata=GKE_METADATA
Updating node pool default-pool... Updating default-pool, done with 2 out of 3 nodes (66.7%): 1 being processed, 2 succeeded...done.
Updated [https://container.googleapis.com/v1/projects/PROJECT_ID/zones/europe-north1-b/clusters/dwk-cluster/nodePools/default-pool].
```
Then I manually triggered the cronjob from lens

```bash
tuomas@zoe:~/kurssit/kube$ kubectl get po
NAME                           READY   STATUS      RESTARTS      AGE
backend-dep-6c599db55c-9cd64   1/1     Running     2 (21m ago)   42m
pg-backup-manual-5c7mg-8c7n8   0/1     Completed   0             2m4s
postgres-set-0                 1/1     Running     0             42m
project-dep-5d89894f8-5g7p9    1/1     Running     1 (21m ago)   42m
todo-cron-28866780-swcz2       0/1     Completed   0             36m

tuomas@zoe:~/kurssit/kube$ gsutil ls gs://postgres-backup-tfhuhtal
gs://postgres-backup-tfhuhtal/backup-2024-11-19.sql
```

# Exercise 3.06

Check the readme

# Exercise 3.05

I added branch testing and then deleted it 

```bash
tuomas@zoe:~/kurssit/kube$ curl -L http://34.36.246.152
<html><head><title>todo-app</title></head><body><img src="cached-image.jpg" style="width: 100px; height: auto;"/><form id="todo-form" action="?" method="POST"><input id="todo-input" type="text" name="title" maxlength="140" required="required"/><button type="submit">Send</button></form><ul><li>Buy groceries</li><li>Walk the dog</li><li>Read a book</li><li>Finish the project report</li><li>Read https://en.wikipedia.org/wiki/Pulmonoscorpius</li></ul></body></html>t
```

# Exercise 3.03 && 3.05

```bash

Run kubectl get namespace $***NAMESPACE*** || kubectl create namespace $***NAMESPACE***
NAME      STATUS   AGE
default   Active   6m2s
Context "gke_***_europe-north1-b_dwk-cluster" modified.
secret/postgres-secret created
service/backend-svc created
service/postgres-db-svc created
service/project-svc created
persistentvolumeclaim/project-claim created
deployment.apps/backend-dep created
deployment.apps/project-dep created
statefulset.apps/postgres-set created
cronjob.batch/todo-cron created
ingress.networking.k8s.io/project-ingress created
Waiting for deployment "backend-dep" rollout to finish: 0 of 1 updated replicas are available...
deployment "backend-dep" successfully rolled out
Waiting for deployment "project-dep" rollout to finish: 0 of 1 updated replicas are available...
deployment "project-dep" successfully rolled out
NAME              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE     SELECTOR
backend-svc       NodePort    34.118.225.222   <none>        2345:32558/TCP   21s     app=backend
kubernetes        ClusterIP   34.118.224.1     <none>        443/TCP          6m22s   <none>
postgres-db-svc   ClusterIP   None             <none>        5432/TCP         21s     app=postgres
project-svc       NodePort    34.118.238.143   <none>        2345:31018/TCP   20s     app=project
```

pasted from gha

# Exercise 2.10
![My fourth image](./assets/picture4.png)

```bash
tuomas@zoe:~/kurssit/kube/project$ kubectl get pods -o wide
NAME                           READY   STATUS      RESTARTS       AGE    IP            NODE                       NOMINATED NODE   READINESS GATES
postgres-set-0                 1/1     Running     4 (4h8m ago)   9d     10.42.1.84    k3d-k3s-default-agent-1    <none>           <none>
project-dep-7d4cdc4f46-ts486   1/1     Running     0              175m   10.42.0.120   k3d-k3s-default-agent-0    <none>           <none>
todo-cron-manual-us0w5-zfvlx   0/1     Completed   0              131m   10.42.1.89    k3d-k3s-default-agent-1    <none>           <none>
todo-cron-28823700-nbrrh       0/1     Completed   0              73m    10.42.0.124   k3d-k3s-default-agent-0    <none>           <none>
my-busybox                     1/1     Running     2 (23m ago)    143m   10.42.2.100   k3d-k3s-default-server-0   <none>           <none>
todo-cron-28823760-9rq7s       0/1     Completed   0              13m    10.42.0.127   k3d-k3s-default-agent-0    <none>           <none>
backend-dep-859bfcddc8-58tc5   1/1     Running     0              8m6s   10.42.0.128   k3d-k3s-default-agent-0    <none>           <none>
tuomas@zoe:~/kurssit/kube/project$ curl -X POST http://localhost:8080/todos -H "Content-Type: application/json" -d '{
  "title": "This is a sample todo item that exceeds the 140 character limit. It is designed to test the backend functionality for handling long text inputs, ensuring that the system can process and store lengthy todo items without any issues."
}'
{"errors":[{"title":"Title is too long, the limit is 140 chars"}]}
```
Also I am port-forwarding backend-svc
```bash
tuomas@zoe:~$ kubectl port-forward service/backend-svc 8080:2345
Forwarding from 127.0.0.1:8080 -> 3001
Forwarding from [::1]:8080 -> 3001
Handling connection for 8080
```

# Exercise 2.09
```bash
tuomas@zoe:~/kurssit/kube$ kubectl apply -f project/manifests/todocron.yaml
cronjob.batch/todo-cron configured
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                           READY   STATUS      RESTARTS       AGE
postgres-set-0                 1/1     Running     4 (117m ago)   9d
project-dep-7d4cdc4f46-ts486   1/1     Running     0              44m
backend-dep-6b649987cc-wlbfg   1/1     Running     0              44m
my-busybox                     1/1     Running     0              12m
todo-cron-28823640-xk8n6       0/1     Completed   0              2m53s
todo-cron-manual-xcuad-jq92g   0/1     Completed   0              63s
todo-cron-manual-us0w5-zfvlx   0/1     Completed   0              33s
tuomas@zoe:~/kurssit/kube$ kubectl get jobs
NAME                     COMPLETIONS   DURATION   AGE
todo-cron-28823640       1/1           6s         3m3s
todo-cron-manual-xcuad   1/1           7s         73s
todo-cron-manual-us0w5   1/1           8s         43s
tuomas@zoe:~/kurssit/kube$ kubectl logs todo-cron-manual-us0w5-zfvlx
{"message":"Todo created"}created todo Read https://en.wikipedia.org/wiki/Rhamnulokinase
```

# Exercise 2.08
```bash
tuomas@zoe:~/kurssit/kube/project$ kubens
kube-system
kube-public
kube-node-lease
default
exercises
project
tuomas@zoe:~/kurssit/kube/project$ kubectl get pods
NAME                           READY   STATUS    RESTARTS        AGE
postgres-set-0                 1/1     Running   0               27m
backend-dep-6b649987cc-ch54d   1/1     Running   4 (8m51s ago)   27m
project-dep-7d4cdc4f46-lrtn6   1/1     Running   3 (8m51s ago)   11m
tuomas@zoe:~/kurssit/kube/project$ curl -l localhost:8081
<html><head><title>todo-app</title></head><body><img src="cached-image.jpg" style="width: 100px; height: auto;"/><form id="todo-form" action="?" method="POST"><input id="todo-input" type="text" name="title" maxlength="140" required="required"/><button type="submit">Send</button></form><ul><li>Buy groceries</li><li>Walk the dog</li><li>Read a book</li><li>Finish the project report</li><li>Moi</li></ul></body></html>
```
- The last li with moi is posted on database using this form, (it is not included in seeding)

# Exercise 2.04
```bash
tuomas@zoe:~/kurssit/kube$ kubectl apply -f manifests/
persistentvolume/example-pv-meta created
persistentvolume/project-pv-meta created
tuomas@zoe:~/kurssit/kube$ kubectl apply -f project/manifests/
deployment.apps/project-dep created
deployment.apps/backend-dep created
ingress.networking.k8s.io/project-ingress created
persistentvolumeclaim/project-claim created
service/project-svc created
service/backend-svc created
tuomas@zoe:~/kurssit/kube$ kubens
kube-system
kube-public
kube-node-lease
default
exercises
project
tuomas@zoe:~/kurssit/kube$ kubectl get pods --namespace=project
NAME                           READY   STATUS    RESTARTS   AGE
backend-dep-7c96747dff-p876s   1/1     Running   0          31s
project-dep-7989df8fd9-pskcd   1/1     Running   0          31s
tuomas@zoe:~/kurssit/kube$
```

# Exercise 2.02
![My third image](./assets/picture3.png)
```bash
tuomas@zoe:~/kurssit/kube$ docker build -t tfhuhtal/todo-app:v1.05 project/todo-app
tuomas@zoe:~/kurssit/kube$ docker push tfhuhtal/todo-app:v1.05
The push refers to repository [docker.io/tfhuhtal/todo-app]
a12a4200cc24: Pushed
fc6d7eb830f8: Layer already exists
ca1f7333bc7f: Layer already exists
1052b457b067: Layer already exists
6a8f65b6edec: Layer already exists
b298ceddbfb8: Layer already exists
44b1b6f4e77e: Layer already exists
63ca1fbb43ae: Layer already exists
v1.05: digest: sha256:5248f76b192b9850649478037fd616d7d29ab9ef105306f8f9cec7abc84f65d6 size: 1996
tuomas@zoe:~/kurssit/kube$ v .
tuomas@zoe:~/kurssit/kube$ kubectl apply -f project/manifests/deployment.yaml
deployment.apps/project-dep configured
deployment.apps/backend-dep unchanged
tuomas@zoe:~/kurssit/kube$ kubectl delete -f project/manifests/deployment.yaml
deployment.apps "project-dep" deleted
deployment.apps "backend-dep" deleted
tuomas@zoe:~/kurssit/kube$ kubectl apply -f project/manifests/deployment.yaml
deployment.apps/project-dep created
deployment.apps/backend-dep created
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                           READY   STATUS    RESTARTS   AGE
project-dep-7989df8fd9-mr2qh   1/1     Running   0          77s
backend-dep-7c96747dff-4vtjr   1/1     Running   0          77s
tuomas@zoe:~/kurssit/kube$ kubectl get svc,ing,pvc
NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
service/kubernetes    ClusterIP   10.43.0.1      <none>        443/TCP    31d
service/project-svc   ClusterIP   10.43.215.11   <none>        2345/TCP   19m
service/backend-svc   ClusterIP   10.43.13.193   <none>        2345/TCP   19m

NAME                                        CLASS     HOSTS   ADDRESS                            PORTS   AGE
ingress.networking.k8s.io/project-ingress   traefik   *       172.19.0.2,172.19.0.3,172.19.0.4   80      19m

NAME                                  STATUS   VOLUME            CAPACITY   ACCESS MODES   STORAGECLASS   AGE
persistentvolumeclaim/project-claim   Bound    project-pv-meta   1Gi        RWO            project-pv     19m
tuomas@zoe:~/kurssit/kube$ curl localhost:8081
<html><head><title>todo-app</title></head><body><img src="cached-image.jpg" style="width: 100px; height: auto;"/><form id="todo-form" action="?" method="POST"><input id="todo-input" type="text" name="title" maxlength="140" required="required"/><button type="submit">Send</button></form><ul><li>Buy groceries</li><li>Walk the dog</li><li>Read a book</li><li>Finish the project report</li><li>wuf wuf</li><li>wuf wuf2</li></ul></body></html>
```

# Exercise 1.13

```bash

tuomas@zoe:~/kurssit/kube$ docker build -t tfhuhtal/project:v0.7 ./project/
tuomas@zoe:~/kurssit/kube$ docker push tfhuhtal/project:v0.7
The push refers to repository [docker.io/tfhuhtal/project]
35ab9b8e0f30: Pushed
6b70d770b48f: Layer already exists
a8699d4c5533: Layer already exists
1052b457b067: Layer already exists
6a8f65b6edec: Layer already exists
b298ceddbfb8: Layer already exists
44b1b6f4e77e: Layer already exists
63ca1fbb43ae: Layer already exists
v0.7: digest: sha256:f8b21a61ab113a76e88a83184cf399eca77dec647399efcc9b460b64bc7ea956 size: 1995
tuomas@zoe:~/kurssit/kube$ v .
tuomas@zoe:~/kurssit/kube$ kubectl delete -f project/manifests/deployment.yaml
deployment.apps "project-dep" deleted
tuomas@zoe:~/kurssit/kube$ kubectl apply -f project/manifests/deployment.yaml
deployment.apps/project-dep created
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                           READY   STATUS              RESTARTS   AGE
project-dep-84d7bf6cb7-qcrvf   0/1     ContainerCreating   0          5s
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                           READY   STATUS    RESTARTS   AGE
project-dep-84d7bf6cb7-qcrvf   1/1     Running   0          53s
```

![My second image](./assets/picture2.png)

# Exercise 1.12

```bash
tuomas@zoe:~/kurssit/kube$ kubectl apply -f manifests/
persistentvolume/project-pv-meta created
tuomas@zoe:~/kurssit/kube$ kubectl apply -f project/manifests/
deployment.apps/project-dep created
ingress.networking.k8s.io/project-ingress created
persistentvolumeclaim/project-claim created
service/project-svc created
tuomas@zoe:~/kurssit/kube$ kubectl get pods
NAME                           READY   STATUS    RESTARTS   AGE
project-dep-6644cd6ddb-wgzpm   1/1     Running   0          46s
tuomas@zoe:~/kurssit/kube$ curl -L localhost:8081
Warning: Binary output can mess up your terminal. Use "--output -" to tell
Warning: curl to output it to your terminal anyway, or consider "--output
Warning: <FILE>" to save to a file.
```
![My Image](./assets/picture.png)

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
