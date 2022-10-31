f = @(x) sin(pi*x.*x);
fp = @(x) f(x)+(1e-1)*rand(size(x));
x = linspace(0,1,1e4+1)';
y = f(x);
yp = fp(x);

maxm = 15;

errors = ones(maxm,1);
VV = ones(1e4+1,maxm+1);
VV(:,2) = x;
for i=3:(maxm+1)
    VV(:,i) = VV(:,i-1).*VV(:,2);
end

for m=1:maxm
    V = VV(:,1:m+1);
    a = V\yp;
    z = V*a;
    errors(m) = max(abs(y-z));
end

semilogy(1:maxm,errors);
xlabel("Grado m");
ylabel("max(abs(y corretto - y pol min quad))");
grid on;