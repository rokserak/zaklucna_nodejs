def tabela(n):
    for i in range(1,n+1):
        vrstica=""
        for j in range(1,n+1):
            if(i==j):
                vrstica+=str(2)
            else:
                if(j>i):
                    vrstica+=str(1)
                else:
                    vrstica+=str(0)
        print(vrstica)

tabela(3)

