import React, { Component } from 'react';
function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
        );
        },
        callback
    );
}
function getLinkComponent(){
   
};
export default ({
    strategy: findLinkEntities,
    component: getLinkComponent,
});