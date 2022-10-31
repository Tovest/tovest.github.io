fsin = @(x) sin(2*pi*x);
fcos = @(x) cos(2*pi*x);
x = linspace(0,1,10001);
ysin = fsin(x);
ycos = fcos(x);

MaxErrors = ones(10,4);
NumAscisseDiInterplazione = "";

for n=5:5:50
    equiX = linspace(0,1,n+1);
    MaxErrors(n/5,1) = max(max(abs(  spline0(equiX,fsin(equiX),x)  -ysin),[],2));
    MaxErrors(n/5,2) = max(max(abs(  spline(equiX,fsin(equiX),x)  -ysin),[],2));
    MaxErrors(n/5,3) = max(max(abs(  spline0(equiX,fcos(equiX),x)  -ycos),[],2));
    MaxErrors(n/5,4) = max(max(abs(  spline(equiX,fcos(equiX),x)  -ycos),[],2));

    NumAscisseDiInterplazione(n/5) = string(n+1)+" ascisse";
end
NumAscisseDiInterplazione = NumAscisseDiInterplazione';

SinTable = table(MaxErrors(:,1),MaxErrors(:,2));
SinTable.Properties.VariableNames = ["Spline Naturale","Spline Not-A-Knot"];
CosTable = table(MaxErrors(:,3),MaxErrors(:,4));
CosTable.Properties.VariableNames = ["Spline Naturale","Spline Not-A-Knot"];

NumAscisseTable = table(NumAscisseDiInterplazione);
NumAscisseTable.Properties.VariableNames = "Num. Ascisse di interpolazione";

FinalTable = table(NumAscisseTable,SinTable,CosTable);
FinalTable.Properties.VariableNames = ["---","Max Err. approssimando sin(2*pi*x)","Max Err. approssimando cos(2*pi*x)"];
disp(FinalTable);

equiX = linspace(0,1,31);

subplot(2,1,1);
plot(x,spline0(equiX,fsin(equiX),x)-ysin,"g",x,spline(equiX,fsin(equiX),x)-ysin,"b",x,zeros(size(ysin)),"--r");
title("Errore approssimando sin(2*pi*x) con 31 ascisse equidistanti");
legend("Spline Naturale","Spline Not-A-Knot");

subplot(2,1,2);
plot(x,spline0(equiX,fcos(equiX),x)-ycos,"g",x,spline(equiX,fcos(equiX),x)-ycos,"b",x,zeros(size(ycos)),"--r");
title("Errore approssimando cos(2*pi*x) con 31 ascisse equidistanti");