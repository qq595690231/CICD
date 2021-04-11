<template>
    <div>
        <p></p>
    </div>
</template>
<script>
import { createOrUpdateMenu } from '@/services/menu'
export default {
    method: {
        async onSubmit () {
            const { data } = await createOrUpdateMenu(this.form)
            // console.log(data)
            if (data.code === '000000') {
                this.$message.success('提交成功')
                this.$router.push('/menu')
            }
        }
    }
}
</script>
<style></style>