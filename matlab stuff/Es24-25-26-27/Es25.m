n = [(1:7)'; 9];
pesi = NaN(length(n),max(n)+1);
for i=1:length(n)
    j = n(i);
    ncp = ncpesi(j);
    pesi(i,1:length(ncp)) = ncp;
end

I = (1/3)*(exp(3)-1);
f = @(x) exp(3*x);

x = NaN(length(n),max(n)+1);
for i=1:length(n)
    j = n(i);
    tx = (0:j)./j;
    x(i,1:length(tx)) = tx;
end

p = f(x);
p = p.*pesi;
r = sum(p,2,'omitnan');
r = r./n;

tab = table(n,r,I-r);
tab.Properties.VariableNames = ["n","In","En"];
disp("        I = "+compose("%.16f",I));
disp(tab);
