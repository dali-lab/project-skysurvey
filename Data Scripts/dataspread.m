DIVIDER = 1;
aa = [129, 141];
bb = [-2, 3];

a = [aa(1): DIVIDER : aa(2)];
b = [bb(1) : DIVIDER : bb(2)];

if (length(a) > length(b))
    disp('A is greater than B');
    szA = length(a);
    tempA = linspace(aa(1),aa(2),szA);
    tempB = linspace(bb(1),bb(2),szA);
elseif (size(a) == size(b))
    disp('A is equal to B');
else
    disp('B is greater than A');
    szB = length(b);
    tempB = b;
    tempA = linspace(aa(1),aa(2),szB);
end

i = 1;
j = 1;
disp('tempA:')
disp(tempA);
disp('tempB:')
disp(tempB);
tempC = zeros(size(tempA));

while i < (szA+szB-1)
   tempC(i) = a(j);   
   i = i + 1;
   tempC(i) = b(j);
   j = j + 1;
   i = i + 1;
end

disp(tempC);



