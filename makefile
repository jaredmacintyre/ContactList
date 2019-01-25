all: a1

a1: *.ts
	tsc *.ts --target ES6 --removeComments

clean:
	rm *.js


