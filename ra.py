names = ["Carlos", "Antonio", "Castillo", "Blas"]
salaries = [1000, 2000, 3000, 4000]
dic4 = {name: salary for (name, salary) in zip(names, salaries)}
print(dic4)
