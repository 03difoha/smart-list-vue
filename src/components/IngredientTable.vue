<template>
  <section>

    <b-table
      :data="ingredientsData"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
      :checkable="true"
    >

      <template slot-scope="props">

        <b-table-column
          field="item"
          label="Item"
        >
          {{ props.row.item }}
        </b-table-column>

        <b-table-column
          field="quantity"
          label="Quantity"
        >
          <div v-if="typeof props.row.quantity === 'object'">
            <p>{{ props.row.quantity.quantity1 }} {{props.row.units.unit1}} + </p>
            <p>{{ props.row.quantity.quantity2 }} {{props.row.units.unit2}}</p>
          </div>

          <p v-if="typeof props.row.quantity != 'object'">{{ props.row.quantity }} {{props.row.units}}</p>

        </b-table-column>

        <b-table-column
          field="alternative"
          label="Alternative"
        >
          {{ props.row.alternative }}
        </b-table-column>

      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large"
              >
              </b-icon>
            </p>
          </div>
        </section>
      </template>

    </b-table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      data: this.ingredientsData,
      isBordered: false,
      isStriped: false,
      isNarrowed: true,
      isHoverable: true,
      isFocusable: false,
      isLoading: this.loading,
      hasMobileCards: true
    }
  },
  props: { ingredientsData: Array, loading: Boolean }
}
</script>
