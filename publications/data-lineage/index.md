---
marp: true
paginate: false
title: Building End-to-End Lineage
backgroundImage: url('./images/bg.png')
backgroundSize: cover
style: |
  section {
    font-size: 1.8em;
    color: white;
    padding: 1.25em;
  }
  h1, h2, h3, h4, h5, h6, p, li {
    color: white;
  }
  .center {
    text-align: center;
  }
  a {
    color: white;
    border-bottom: 1px dashed white;
    text-decoration: none;
  }
  footer {
    text-align: center;
  }
---

# Building End-to-End Lineage with Kafka, Flink, and Spark

<br><br><br><br><br>

## Jaehyeon Kim
Developer Experience @ Factor House

---

# What is Data Lineage?

The journey of data - where it comes from, how it’s transformed, and where it ends up.

## Why Data Lineage Matters
- **Debugging & Root Cause Analysis**: Quickly trace issues back to the source.
- **Impact Analysis & Governance**: See what happens if a table changes.
- **Compliance & Audit**: Show data provenance for regulations.
- **Trust & Reliability**: Increase confidence in data products.

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

One answers **"what happened?"** and the other shows **"what is happening right now."**

<style>
.columns {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
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
  *(Retrospective)*

  - **Data:** Bounded Sets
  - **Lifecycle:** Finite, Scheduled
  - **Capture:** At Job Completion
  - **Result:** Historical Audit Trail

  </div>
  <div>

  ### Streaming Lineage:
  *(Real-time & Operational)*

  - **Challenge:** Unbounded Streams
  - **Challenge:** Continuous Jobs
  - **Opportunity:** Capture **During** Job Execution
  - **Opportunity:** A **Live, Observable System**

  </div>
</div>

---

# Kafka: Enabling Lineage with Connect

Use custom **Single Message Transform (SMT)** as a "pass-through" lineage agent for Kafka Connect

- **How it works**
  - Hooks into the connector lifecycle (`RUNNING`, `FAIL`, `COMPLETE`) without altering data records.
- **Key Feature**
  - Column-level lineage via Avro schemas in Schema Registry
- **Consistent Namespacing**
  - Creates physical dataset namespaces (`kafka://...`, `s3://...`) for job linking across Flink and Spark.

---

Kafka: One lineage job per connector
<br>
<div class="center">

![](./images/data-lineage.gif)

</div>

---

# Flink: Two Integration Patterns

OpenLineage handles [Flink 1.x and 2.x differently](https://openlineage.io/docs/integrations/flink/about); we use Flink 1.20.

<div class="columns">
  <div>

  ### Native `JobListener`: 
  *(For DataStream API)*
  - **Method:** Use `OpenLineageFlinkJobListener`.
  - **Pros:** Simple, "out-of-the-box" integration.
  - **Cons:** **CRITICAL:** Fails to report the final `ABORT` status when a job is cancelled.

  </div>
  <div>

  ### Manual Orchestration
  *(For Table API)*
  - **Method:** Use the OpenLineage Java client directly.
  - **Pros:** Complete lifecycle tracking including (`ABORT`/`FAIL`).
  - **Cons:** Requires more explicit code in the application.

  </div>
</div>

---

Flink: One lineage job per application
<br>
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
- Spark and upstream jobs (e.g., Flink) must use the same physical namespace (`s3://warehouse`) for end-to-end lineage.

---

Spark: One lineage job per action
<br>
<div class="center">

![](./images/data-lineage.gif)

</div>

---

# Conclusion: Key Takeaways & Next Steps

<div class="columns">
  <div>

  ### Key Takeaways

  - **Choose the Right Integration Pattern**
    - Balance simplicity vs. reliability.
  - **Align Namespaces**
    - Essential for linking jobs across technologies (e.g., Flink & Spark).

  </div>
  <div>

  ### Next Steps

  - **Explore the data lineage labs**
    - See link on the next slide.
  - **Start Small**
    - Instrument a single critical pipeline first.
  - **Questions?**

  </div>
</div>

---

# Let's Get Connected!

<div class="center">

![](./images/qr-codes.png)

</div>