class JoesAnimationMenu {
    constructor(anims, menuName="Animationen") {
        this.selectedItemIndex = -1;
        this.minDifferrence = 1500;
        this.anims = anims;
        this.isSown = false;
        this.lastTrigger = new Date();
        this.content = $("<div></div>").addClass("content");
        this.menu = $("<div></div>")
            .addClass("animationMenu")
            .append(
                $("<div></div>")
                    .addClass("title")
                    .append(
                        $("<h2></h2>")
                            .html(`${menuName}`),

                        $("<div></div>")
                            .addClass("close")
                            .html("&times;")
                            .on({
                                click: () => {
                                    this.hide();
                                }
                            }),
                    ),

                this.content
            )
            .appendTo("body")
            .hide();


        this.anims.sort();
        for(let i=0; i < this.anims.length; i++) {
            let anim = this.anims[i];
            let element = $("<div></div>")
                .addClass("listItem")
                .html(anim[0])
                .on({
                    click: () => {
                        this.triggerAnimation(anim);
                    }
                });

            this.content.append(
                element
            );
        }

        this.content.append(
            $("<div></div>")
                .addClass("listItem")
                .css("color", "var(--anim_stopButtonColor)")
                .html("Abbrechen")
                .on({
                    click: () => {
                        this.stopAnimation();
                    }
                })
        );

        window.onkeydown = e => {
            this.onKeyDown(e);
        }
    }

    onKeyDown(e) {
        if(!this.isSown) {
            return;
        }

        let key = e.which;

        switch(key) {
            case 38:
                this.keyPress(-1);
                break;

            case 40:
                this.keyPress(1);
                break;

            case 13:
                let item = this.content.children("div.listItem")[this.selectedItemIndex];
                if(item == undefined) {
                    return;
                }

                item.click();
                break;
        }

    }

    toggle () {
        if(this.isSown) {
            this.hide();
            return;
        }

        this.show();
    }

    hide() {
        if(!this.isSown) {
            return;
        }

        this.isSown = false;
        this.menu.fadeOut();
    }

    show() {
        if(this.isSown) {
            return;
        }

        this.isSown = true;
        this.menu.fadeIn();
    }

    canTrigger() {
        return (new Date() - this.lastTrigger) > this.minDifferrence;
    }

    error(message) {
        mp.trigger("Joe_ErrorMessage", message);
    }

    triggerAnimation(animation) {
        if(!this.canTrigger) {
            this.error("spam?!");
            return;
        }

        this.lastTrigger = new Date();
        let displayName = animation[0];     // string
        let dict = animation[1];            // string
        let group = animation[2];           // string
        let flag = animation[3];            // number(int)

        mp.trigger("Joe_WantPlayAnimation", displayName, dict, group, flag);
    }

    stopAnimation() {
        if(!this.canTrigger) {
            this.error("spam?!");
            return;
        }

        this.hide();
        mp.trigger("Joe_WantStopAnimation");
    }

    keyPress(mode) {
        let items = this.content.children("div.listItem");
        this.selectedItemIndex += mode;

        let prv = this.content.children("div.listItem.active")[0];
        if(prv != undefined) {
            $(prv).removeClass("active");
        }

        if (this.selectedItemIndex == items.length) {
            this.selectedItemIndex = 0;
        } else if (this.selectedItemIndex < 0) {
            this.selectedItemIndex = items.length - 1;
        }

        let item = this.content.children("div.listItem")[this.selectedItemIndex];
        $(item).addClass("active");
    }


}