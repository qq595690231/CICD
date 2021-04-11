<template></template>
<script>
import { createOrUpdataMenu } from '@/services/menu'
export default {
    method: {
        async onSubmit () {
            const { data } = await createOrUpdataMenu(this.form)
            console.log(data)
        }
    }
}
</script>
<style>
</style>