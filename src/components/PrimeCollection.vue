<template>
    <section class="container collection-section">
        <div class="section-card">
            <div class="w-full grid sm:grid-cols-[1.2fr_1fr] gap-5 max-w-[1200px] mx-auto p-5 border border-[currentColor]">
                <div class="relative w-full sm:h-[auto] h-[200px] overflow-hidden animate-item">
                    <img src="@/assets/images/6.jpeg" class="absolute inset-0 h-full w-full object-cover animate-scale-image" />
                </div>
                <div class="flex flex-col items-center">
                    <h3 class="times-new-roman-ps-italic sm:text-5xl text-3xl mt-5 mb-1">Prime Collection</h3>
                    <div class="text-xs mb-[93px] collection-list">
                        <div class="collection-item">Belgravia</div>
                        <div class="collection-item">Chelsea</div>
                        <div class="collection-item">Kensington</div>
                        <div class="collection-item">Knightsbridge</div>
                        <div class="collection-item">Mayfair</div>
                        <div class="collection-item">Westminster</div>
                    </div>
                    <img src="@/assets/images/jll-logo.svg" class="max-h-10 self-end jll-logo" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.collection-section {
    .collection {
        &-list {
            display: flex;
            flex-wrap: wrap;
        }
        &-item {
            position: relative;
            padding-inline: 4px;
            &:not(:last-child) {
                border-right: 1px solid currentColor;
            }
        }
    }
}
</style>