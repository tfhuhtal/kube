# Exercise 5.05

### Rancher vs. OpenShift

#### Rancher
- **Open Source**: Rancher is fully open-source and free to use.
- **Multi-Cluster Management**: Rancher excels in managing multiple Kubernetes clusters across different environments (on-premises, cloud, hybrid).
- **User Interface**: Rancher provides a user-friendly and intuitive UI for managing clusters and workloads.
- **Flexibility**: Rancher supports any certified Kubernetes distribution, giving users the flexibility to choose their preferred Kubernetes version.
- **Lightweight**: Rancher is lightweight and can be easily installed and configured.
- **Community Support**: Strong community support with extensive documentation and active forums.

#### OpenShift
- **Enterprise-Grade**: OpenShift is designed for enterprise use with robust security, compliance, and support features.
- **Integrated CI/CD**: OpenShift includes integrated CI/CD pipelines, making it easier to manage the entire application lifecycle.
- **Developer Tools**: Provides a rich set of developer tools and frameworks, including Source-to-Image (S2I) for building container images.
- **Red Hat Ecosystem**: As part of the Red Hat ecosystem, OpenShift benefits from Red Hat's extensive enterprise support and integration with other Red Hat products.
- **Security**: Strong focus on security with built-in security policies, role-based access control (RBAC), and automated updates.
- **Hybrid Cloud**: Supports hybrid cloud deployments with seamless integration between on-premises and cloud environments.

#### Conclusion
**Better Service Provider: OpenShift**

- **Enterprise Features**: OpenShift's enterprise-grade features, including integrated CI/CD, robust security, and compliance, make it a better choice for large organizations.
- **Developer Experience**: The rich set of developer tools and frameworks provided by OpenShift enhances the developer experience and productivity.
- **Support and Ecosystem**: OpenShift benefits from Red Hat's extensive support and integration with other enterprise products, making it a more comprehensive solution for enterprises.

While Rancher is excellent for multi-cluster management and flexibility, OpenShift's enterprise features and support make it a better choice for organizations looking for a robust, secure, and integrated Kubernetes platform.


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