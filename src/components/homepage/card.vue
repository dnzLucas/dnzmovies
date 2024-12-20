<script setup></script>
<template>
    <div class="cards-area">
        <router-link to="/TV" class="link">
            <div class="card">
            <p>Programas de tv</p>
        </div>
        </router-link>
        <router-link to="/filmes" class="link">
            <div class="card">
            <p>Filmes</p>
        </div>
        </router-link>
    </div>

</template>


<style>
@import "../../assets/Sass/homepage/_card.scss";
</style>