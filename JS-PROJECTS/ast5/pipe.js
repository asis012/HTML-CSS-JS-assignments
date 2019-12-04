function Pipe(parentElem, left, top, height , src){
    this.parentElem = parentElem;
    this.pipe;
    this.top = top;
    this.left = left;
    this.height = height;
    this.width = 135;
    this.src = src;
    this.hasPassed = false;

    this.init = function(){
        this.pipe = document.createElement('div');
        this.pipe.style.width = this.width + 'px';
        this.pipe.style.height = this.height + 'px';
        this.pipe.style.top = this.top + 'px';
        this.pipe.style.background = this.src;

        if(this.top == 0){
            this.pipe.style.backgroundPosition = 'bottom';
        }

        this.pipe.style.position = 'absolute';

        this.draw();

        this.parentElem.appendChild(this.pipe);
    }

    this.draw = function(){
        this.pipe.style.left = this.left + 'px';
    }

    this.destroy = function(){
        this.parentElem.removeChild(this.pipe);
    }
}