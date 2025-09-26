---
marp: true
paginate: false
title: Building End-to-End Lineage
backgroundImage: url('./images/bg.png')
backgroundSize: cover
style: |
  @font-face {
    font-family: 'Stolzl';
    src: url('./fonts/Stolzl-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  section {
    font-family: 'Stolzl', sans-serif;
    font-size: 1.5em;
    color: white;
    padding: 1.25em;
  }
  * {
    font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6, p, li {
    color: white;
    font-weight: 700;
  }
  .center {
    text-align: center;
  }
  a {
    color: white;
    border-bottom: 1px dashed white;
    text-decoration: none;
  }
---

# Building End-to-End Lineage <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with Kafka, Flink, and Spark

<br><br><br><br><br>

## Jaehyeon Kim

Developer Experience @ Factor House

---

# What is Data Lineage?

The journey of data - where it comes from, how it’s transformed, and where it ends up.

## Why Data Lineage Matters

- **Debugging & Root Cause Analysis**: 
  - Quickly trace issues back to the source.
- **Impact Analysis & Governance**: 
  - See what happens if a table changes.
- **Compliance & Audit**: 
  - Show data provenance for regulations.
- **Trust & Reliability**: 
  - Increase confidence in data products.

---

![bg right fit](./images/openlineage-model.png)

# What is OpenLineage?

[OpenLineage](https://openlineage.io/docs) is an open standard for capturing lineage metadata from jobs in execution.

It supports integration with popular data tools:

- **Airflow / dbt / Great Expectations (data quality)**
- **Flink / Spark / Hive & Trino**
- **Marquez** (visualization & metadata)
- ⚠️ **Kafka** is not an official integration source.

---

# Understanding the Two Lineage Paradigms

One shows **"what happened"**, the other **"what's happening now"**.

<style>
.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  text-align: left;
}
.columns h3 {
  margin-top: 0;
}
</style>

<div class="columns">
  <div>

### Batch Lineage:

_(Retrospective)_

- **Data:** Bounded Sets
- **Lifecycle:** Finite, Scheduled
- **Capture:** At Job Completion
- **Result:** Historical Audit Trail

  </div>
  <div>

### Streaming Lineage:

_(Real-time & Operational)_

- **Challenge:** Unbounded Streams
- **Challenge:** Continuous Jobs
- **Opportunity:** Capture **During** Job Execution
- **Opportunity:** A **Live, Observable System**

  </div>
</div>

---

# Kafka: Enabling Lineage with Connect

Use custom **Single Message Transform (SMT)** as a "pass-through" lineage agent.

- **How it works**
  - Hooks into connector lifecycle (`RUNNING`, `FAIL`, `COMPLETE`) without changing records.
- **Key Feature**
  - Column-level lineage via Avro schemas in Schema Registry
- **Consistent Namespacing**
  - Creates physical dataset namespaces (`kafka://...`, `s3://...`) for job linking.

---

Kafka: One lineage job per connector
<div class="center">

![](./images/data-lineage.gif)

</div>

---

# Flink: Two Integration Patterns

OpenLineage handles [Flink 1.x and 2.x differently](https://openlineage.io/docs/integrations/flink/about); we use Flink 1.20.

<div class="columns">
  <div>

### Native `JobListener`:

_(For DataStream API)_

- **Method:** Use `OpenLineageFlinkJobListener`.
- **Pros:** Simple, "out-of-the-box" integration.
- **Cons:** Misses final `ABORT` on cancellation.

  </div>
  <div>

### Manual Orchestration

_(For Table API)_

- **Method:** Use OpenLineage Java client.
- **Pros:** Complete lifecycle tracking including (`ABORT`/`FAIL`).
- **Cons:** Requires more explicit code in the app.

  </div>
</div>

---

Flink: One lineage job per application
<div class="center">

![](./images/data-lineage.gif)

</div>

---

# Spark: Completing the End-to-End Picture

A batch Spark job reads from a Flink Iceberg table and writes to a new one.

- **Method:** OpenLineage Java **agent** via `spark.extraListeners`
- **Discovery:** Auto-detects inputs/outputs from query plan
- **Granularity:** Parent job with child jobs per action

💡 **Namespace alignment** is key

- Upstream jobs (e.g., Flink) must use the same physical NS (`s3://warehouse`).

---

Spark: One lineage job per action
<div class="center">

![](./images/data-lineage.gif)

</div>

---

# Conclusion: Key Takeaways & Next Steps

<div class="columns">
  <div>

### Key Takeaways

- **Choose the Right Pattern**
  - Balance simplicity vs. reliability.
- **Align Namespaces**
  - Essential for cross-tech lineage.

  </div>
  <div>

### Next Steps

- **Explore the data lineage labs**
  - See link on the next slide.
- **Start Small**
  - Instrument a single critical pipeline first.

  </div>
</div>

---

<div class="center">

![](./images/qna.png)

</div>

---

# Let's Get Connected!

<div class="center">

![](./images/qr-codes.png)

</div>
