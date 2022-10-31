f = @(x) 1./( 2*( 2*x.*x - 2*x +1 ) );
f1 = @(x) -((8*x-4)./((4*x.*x-4*x+2).*(4*x.*x-4*x+2)));
x = linspace(-2,3,10001);
y = f(x);


MaxErrEquidistanti = ones(10,5);
MaxErrChebyshev = ones(10,5);
NumAscisseDiInterplazione = "";

for n=4:4:40
    equiX = linspace(-2,3,n+1);
    equiY = f(equiX);
    MaxErrEquidistanti(n/4,1) = max(max(abs(  lagrange(equiX,equiY,x)  -y),[],2));
    MaxErrEquidistanti(n/4,2) = max(max(abs(  newton(equiX,equiY,x)  -y),[],2));
    MaxErrEquidistanti(n/4,3) = max(max(abs(  hermite(equiX,equiY,f1(equiX),x)  -y),[],2));
    MaxErrEquidistanti(n/4,4) = max(max(abs(  spline0(equiX,equiY,x)  -y),[],2));
    MaxErrEquidistanti(n/4,5) = max(max(abs(  spline(equiX,equiY,x)  -y),[],2));

    chebX = xchebyshev(n,-2,3);
    chebY = f(chebX);
    MaxErrChebyshev(n/4,1) = max(max(abs(  lagrange(chebX,chebY,x)  -y),[],2));
    MaxErrChebyshev(n/4,2) = max(max(abs(  newton(chebX,chebY,x)  -y),[],2));
    MaxErrChebyshev(n/4,3) = max(max(abs(  hermite(chebX,chebY,f1(chebX),x)  -y),[],2));
    MaxErrChebyshev(n/4,4) = max(max(abs(  spline0(chebX,chebY,x)  -y),[],2));
    MaxErrChebyshev(n/4,5) = max(max(abs(  spline(chebX,chebY,x)  -y),[],2));

    NumAscisseDiInterplazione(n/4) = string(n+1)+" ascisse";
end
NumAscisseDiInterplazione = NumAscisseDiInterplazione';

MaxErrLaGrangeTable = table(MaxErrEquidistanti(:,1),MaxErrChebyshev(:,1));
MaxErrNewtonTable = table(MaxErrEquidistanti(:,2),MaxErrChebyshev(:,2));
MaxErrHermiteTable = table(MaxErrEquidistanti(:,3),MaxErrChebyshev(:,3));
MaxErrSplineNaturaleTable = table(MaxErrEquidistanti(:,4),MaxErrChebyshev(:,4));
MaxErrSplineNotAKnotTable = table(MaxErrEquidistanti(:,5),MaxErrChebyshev(:,5));
MaxErrLaGrangeTable.Properties.VariableNames = ["X equidistanti","X di Chebyshev"];
MaxErrNewtonTable.Properties.VariableNames = ["X equidistanti","X di Chebyshev"];
MaxErrHermiteTable.Properties.VariableNames = ["X equidistanti","X di Chebyshev"];
MaxErrSplineNaturaleTable.Properties.VariableNames = ["X equidistanti","X di Chebyshev"];
MaxErrSplineNotAKnotTable.Properties.VariableNames = ["X equidistanti","X di Chebyshev"];

NumAscisseTable = table(NumAscisseDiInterplazione);
NumAscisseTable.Properties.VariableNames = "Num. Ascisse di interpolazione";

FinalTable = table(NumAscisseTable,MaxErrLaGrangeTable,MaxErrNewtonTable,MaxErrHermiteTable,MaxErrSplineNaturaleTable,MaxErrSplineNotAKnotTable);
FinalTable.Properties.VariableNames = ["---","Max Err. Lagrange","Max Err. Newton","Max Err. Hermite","Max Err. Spline Naturale","Max Err. Spline Not-A-Knot"];
disp(FinalTable);