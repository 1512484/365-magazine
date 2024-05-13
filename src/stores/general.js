import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useGeneralStore = defineStore("general", () => {
    const windowWidth = ref(0);

    const isMdAndUp = computed(() => windowWidth.value >= 920);

    const TAG = {
        FOOD_AND_DRINK: "Food & Drink",
        PLACES: "Places",
        TRAVEL: "Travel",
        PEOPLE: "People",
    }
    const newArticles = ref([
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "8 Places to Enjoy Drinks Outdoors In Brighton - From the 12th April",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        },
        {
            tag: TAG.PLACES,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "2.jpg",
            duration: 3
        }
    ]);
    const editorPickArticles = ref([
        {
            tag: TAG.TRAVEL,
            title: "4 Of The Most Luxurios Hotels In Cornowall",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "3.jpg",
            duration: 3
        },
        {
            tag: TAG.TRAVEL,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "4.webp",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "5.jpg",
            duration: 3
        }
    ]);
    const foodAndDrinksArticles = ref([
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "Macmilan's Cocktail Bar in worthing - The Insider's Scoop",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "7.jpg",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "8.jpg",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "Macmilan's Cocktail Bar in worthing - The Insider's Scoop",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "7.jpg",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "8.jpg",
            duration: 3
        }
    ]);
    const placesArticles = ref([
        {
            tag: TAG.PLACES,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "5.jpg",
            duration: 3
        },
        {
            tag: TAG.PLACES,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "9.webp",
            duration: 3
        },
        {
            tag: TAG.PLACES,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        },
        {
            tag: TAG.PLACES,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "5.jpg",
            duration: 3
        },
        {
            tag: TAG.PLACES,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "9.webp",
            duration: 3
        },
        {
            tag: TAG.PLACES,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        }
    ]);
    const peopleArticles = ref([
        {
            tag: TAG.PEOPLE,
            title: "Ten Minutes With Chef Steven Edwards",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "10.jpg",
            duration: 3
        },
        {
            tag: TAG.PEOPLE,
            title: "Ten minutes with Christina Thornton, Surrey Artist",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "10.png",
            duration: 3
        },
        {
            tag: TAG.PEOPLE,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        }
    ]);
    const archiveArticles = ref([
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        },
        {
            tag: TAG.PEOPLE,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "11.jpg",
            duration: 3
        },
        {
            tag: TAG.TRAVEL,
            title: "4 Of The Most Luxurios Hotels In Cornowall",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "12.webp",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        },
        {
            tag: TAG.PEOPLE,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "11.jpg",
            duration: 3
        },
        {
            tag: TAG.TRAVEL,
            title: "4 Of The Most Luxurios Hotels In Cornowall",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "12.webp",
            duration: 3
        },
        {
            tag: TAG.FOOD_AND_DRINK,
            title: "3 of the Best Coffee Shops in Guildford - The Lowdown",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "1.jpg",
            duration: 3
        },
        {
            tag: TAG.PEOPLE,
            title: "5 Of The Best Walks In Surrey To Do This Spring",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "11.jpg",
            duration: 3
        },
        {
            tag: TAG.TRAVEL,
            title: "4 Of The Most Luxurios Hotels In Cornowall",
            short_description: "Why you should hire an expert for your next home interiors project.",
            thumbnail: "12.webp",
            duration: 3
        },
    ]);

    const setWindowWidth = (value) => {
        windowWidth.value = value;
    }

    return {
        newArticles,
        editorPickArticles,
        foodAndDrinksArticles,
        placesArticles,
        peopleArticles,
        archiveArticles,
        windowWidth,
        isMdAndUp,
        setWindowWidth
    }
});