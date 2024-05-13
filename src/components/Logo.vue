<template>
    <div class="flex items-center logo">
        <div class="sm:text-base text-sm border border-[currentColor] rounded-xl leading-none px-1 logo-number">365</div>
        <div class="sm:text-2xl text-xl leading-none tracking-tighter -translate-y-0.5 logo-text ml-1">MAGAZINE</div>
    </div>
</template>

<style lang="scss">
.logo {
    .logo-number {
        position: relative;
        &::after {
            content: "";
            position: absolute;
            top: -2px;
            left: 60%;
            border-style: solid;
            border-width: 1px 0px 1px 2px;
            border-color: white white currentColor currentColor;
            box-shadow: 1px 0px white;
        }
        &::before {
            content: "";
            position: absolute;
            top: -1px;
            left: 60%;
            border-style: solid;
            border-width: 1px 0px 1px 2px;
            border-color: currentColor white white currentColor;
            box-shadow: 1px 0px white;
        }
    }
}
</style>