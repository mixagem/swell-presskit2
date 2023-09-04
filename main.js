const funkyElements = {
    'section#origins>div>p:first-of-type': {
        // (aka distance from bottom)
        viewports: [
            [0, 30],
            [30, 55],
            [55, 100]
        ],
        classes: [
            { classesToAdd: ['invisible'], removeAll: true },
            { classesToAdd: ['fade-in'], removeAll: true },
            { classesToAdd: ['scale-down'], removeAll: true }
        ]
    }
}

onscroll = (event) => {
    funkMyElements()
}


function getElementVisibilityInfo(element) {

    const clientRect = document.querySelector(element).getBoundingClientRect()
    // altura elemento
    const viewPortSize = window.innerHeight
    // posição elemento na janela
    const positionOnWindow = clientRect.y
    // percentagem visivel
    const distanceFromBottom = positionOnWindow / viewPortSize


    if (positionOnWindow > viewPortSize || positionOnWindow < -viewPortSize) {
        visibilityInfo = { animationRange: false }
        return visibilityInfo
    }

    switch (true) {
        case positionOnWindow === 0:
            visibilityInfo = { animationRange: true, position: 'center', distanceFromBottom: 100 }
            break;
        case positionOnWindow > 0:
            visibilityInfo = { animationRange: true, position: 'top', distanceFromBottom: (1 - distanceFromBottom) * 100 }
            break;
        case positionOnWindow < 0:
            visibilityInfo = { animationRange: true, position: 'bottom', distanceFromBottom: (1 + distanceFromBottom) * 100 }
            break;
    }

    return visibilityInfo
}

function funkMyElements() {
    Object.keys(funkyElements).forEach(element => {
        const elementVisibilityInfo = getElementVisibilityInfo(element)

        // element not in need of funk
        if (!elementVisibilityInfo.animationRange || elementVisibilityInfo.position === 'bottom') { return }

        const funkyStyles = funkyElements[element];
        const DOMElement = document.querySelector(element);

        for (i = 0; i < funkyStyles.viewports.length; i++) {
            if (elementVisibilityInfo.distanceFromBottom >= funkyStyles.viewports[i][0] && elementVisibilityInfo.distanceFromBottom < funkyStyles.viewports[i][1]) {

                if (funkyStyles.classes[i].removeAll) {
                    DOMElement.classList = '';
                } else {
                    funkyStyles.classes[i].classesToRemove.forEach(cssClass => {
                        DOMElement.classList.remove(cssClass)
                    });
                }

                funkyStyles.classes[i].classesToAdd.forEach(cssClass => {
                    DOMElement.classList.add(cssClass)

                });
            }
        }
    });
}

funkMyElements();