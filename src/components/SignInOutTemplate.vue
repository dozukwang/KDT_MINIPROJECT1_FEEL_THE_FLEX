<template>
  <div class="wrapper">
    <slot name="pageName"></slot>
    <div class="user_form">
      <slot></slot>
      <slot name="submitBtn"></slot>
    </div>
    <div class="is_sign_inup">
      <slot name="isSignInUp"></slot>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.wrapper{
  width: 50%;
  max-width: 400px;
  // height: 50%;
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-40%);

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  .user_form{
    line-height: 20px;
    }
    .is_sign_inup{text-align: center;}
}

</style>
