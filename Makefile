up:
	docker compose up -d --remove-orphans

kafka-consume:
	docker compose exec cdc_kafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic shop.public.orders --from-beginning

kafka-producer:
	docker compose exec -it cdc_kafka /opt/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic test
