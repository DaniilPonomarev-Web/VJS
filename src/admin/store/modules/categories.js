export  default { 
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        SET_CATEGORIES: (state, categories)  => (state.data = categories),
        ADD_CATEGORY: (state, category)  => state.data.unshift(category),
        DELETE_CATEGORY(state, id) {
            state.categories = state.categories.filter(category => category.id !== id);
        },
        ADD_SKILL:  (state, newSkill) => {
            state.data = state.data.map(category => {
                //console.log(newSkill.category);
                if (category.id === newSkill.category) {
                    category.skills.push(newSkill);
                }
                return category;
            })
        },
        REMOVE_SKILL: (state, skillToRemove) => {
            state.data = state.data.map(category => {
                //console.log(category.id);
                //console.log(skillToRemove.category);

                if (category.id === skillToRemove.category) {
                    category.skills = category.skills.filter( skill =>  {
                        return skill.id != skillToRemove.id
                    });
                }
                return category;
            })
        },
        EDIT_SKILL: (state, skillToEdit) => {
            const editSkillInCategory = category => {
              category.skills = category.skills.map(skill => {
                return skill.id === skillToEdit.id ? skillToEdit : skill
              });
            }
      
            const findCategory = category => {
              if (category.id === skillToEdit.category) {
                editSkillInCategory(category);
              }
      
              return category;
            }
            state.data = state.data.map(findCategory);
        }
    },
    actions: {
       async  create({commit}, title) {
           try {
               const { data } = await this.$axios.post('/categories', {title});
               commit("ADD_CATEGORY", data)
           } catch (error) {
                console.log(error);
           }
        },
        async deleteCat(store, id) {
            try {
                await this.$axios.delete(`/categories/${id}`);
                store.commit('DELETE_CATEGORY', id);
            } catch (error) {
                throw new Error('Ошибка удаления категории');
            }
        },
        async  fetch({commit}) {
            try {
                const {data} = await this.$axios.get('/categories/461');
                commit("SET_CATEGORIES",  data);
                console.log(response);
            } catch (error) {
             console.log(error);
            }
        },
    }
}